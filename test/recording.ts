import {
  Recording,
  setupRecording,
  SetupRecordingInput,
  mutations,
} from '@jupiterone/integration-sdk-testing';

export { Recording };

export function setupSentryRecording(options: SetupRecordingInput) {
  return setupRecording({
    ...options,
    options: {
      matchRequestsBy: {
        url: {
          pathname: false,
        },
      },
    },
    mutateEntry: (entry) => {
      mutations.unzipGzippedRecordingEntry(entry);

      if (/oauth2\/token/.exec(entry.request.url) && entry.request.postData) {
        // Redact request body with secrets for authentication
        entry.request.postData.text = '[REDACTED]';

        // Redact authentication response token
        const responseText = entry.response.content.text;
        const responseJson = responseText && JSON.parse(responseText);
        if (responseJson.access_token) {
          entry.response.content.text = JSON.stringify(
            {
              ...responseJson,
              access_token: '[REDACTED]',
            },
            null,
            0,
          );
        }
      }
    },
  });
}

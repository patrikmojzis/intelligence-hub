import { t } from "ttag";

import { skipToken, useGetDatabaseQuery } from "metabase/api";
import { useSetting } from "metabase/common/hooks";
import { _FileUploadErrorModal } from "metabase/status/components/FileUploadStatusLarge/FileUploadErrorModal";
import { Box, Button, Modal, Stack, Text } from "metabase/ui";

import databaseError from "./database-error.svg?component";

function PausedModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal opened onClose={onClose} padding="xl" withCloseButton={false}>
      <Stack gap="md" pt="lg" ta="center">
        <Box component={databaseError} mx="auto" />
        <Text size="lg" fw="bold">
          {t`Couldn't upload the file, storage is full`}
        </Text>
        <Text c="text-secondary">
          {t`Connect a database to store uploaded files, or contact your admin to configure file storage.`}
        </Text>

        <Stack w="50%" my="lg" mx="auto">
          <Button variant="filled" onClick={onClose}>
            {t`OK`}
          </Button>
        </Stack>
      </Stack>
    </Modal>
  );
}

export const FileUploadErrorModal = ({
  onClose,
  fileName,
  children,
}: {
  onClose: () => void;
  fileName?: string;
  children: string;
}) => {
  const uploadsSettings = useSetting("uploads-settings");
  const { data: dbInfo } = useGetDatabaseQuery(
    uploadsSettings?.db_id ? { id: uploadsSettings.db_id } : skipToken,
  );

  const isDwh = dbInfo?.is_attached_dwh;
  const showPausedError = isDwh && isPausedError(children);

  if (showPausedError) {
    console.error(children);

    return <PausedModal onClose={onClose} />;
  }

  return (
    <_FileUploadErrorModal onClose={onClose} fileName={fileName} opened>
      {children}
    </_FileUploadErrorModal>
  );
};

function isPausedError(message: string) {
  return message.includes("Code: 497");
}

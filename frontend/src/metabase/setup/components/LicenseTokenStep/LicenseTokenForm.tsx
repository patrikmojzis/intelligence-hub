import { t } from "ttag";

import {
  Form,
  FormErrorMessage,
  FormProvider,
  FormSubmitButton,
  FormTextInput,
} from "metabase/forms";
import {
  Box,
  Button,
  Divider,
  Flex,
  HoverCard,
  Icon,
  Stack,
  Text,
  UnstyledButton,
} from "metabase/ui";

import { LICENSE_TOKEN_SCHEMA } from "./constants";

type LicenseTokenFormProps = {
  onSubmit: (token: string) => Promise<void>;
  onSkip: () => void;
  initialValue?: string;
};

const CARD_WIDTH = 300;

export const LicenseTokenForm = ({
  onSubmit,
  onSkip,
  initialValue = "",
}: LicenseTokenFormProps) => {
  return (
    <FormProvider
      initialValues={{ license_token: initialValue }}
      validationSchema={LICENSE_TOKEN_SCHEMA}
      onSubmit={(values) => onSubmit(values.license_token)}
    >
      {({ errors, setValues }) => (
        <Form>
          <Box mb="md">
            <FormTextInput
              aria-label={t`Token`}
              placeholder={t`Paste your token here`}
              name="license_token"
              onChange={(e) => {
                const val = e.target.value;
                const trimmed = val.trim();
                if (val !== trimmed) {
                  setValues({ license_token: trimmed });
                }
              }}
              rightSection={
                <Box>
                  <HoverCard position="bottom-end">
                    <HoverCard.Target>
                      <UnstyledButton
                        component={Icon}
                        size="1rem"
                        name="info"
                        aria-label={t`Token details information`}
                        c="core-brand"
                      />
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Stack gap="md" p="md" w={CARD_WIDTH}>
                        <Text lh="lg">{t`Find your license token in the subscription confirmation email from Metabase`}</Text>
                      </Stack>
                    </HoverCard.Dropdown>
                  </HoverCard>
                </Box>
              }
              rightSectionWidth="2rem"
            />
            <FormErrorMessage />
          </Box>
          <Flex gap="sm">
            <FormSubmitButton
              label={t`Activate`}
              activeLabel={t`Activating`}
              disabled={!!errors.license_token}
              variant="filled"
            />
          </Flex>
          <Divider mx={{ base: "-2rem", sm: "-4rem" }} mt="xl" mb="md" />
          <Box>
            <Button
              onClick={onSkip}
              variant="subtle"
              px={0}
              fw="normal"
            >{t`I'll activate later`}</Button>
            <Text c="text-disabled" size="sm">
              {t`You can activate a license later from Admin settings.`}
            </Text>
          </Box>
        </Form>
      )}
    </FormProvider>
  );
};

import { DashboardCard } from "@dashboard/components/Card";
import { Combobox } from "@dashboard/components/Combobox";
import FormSpacer from "@dashboard/components/FormSpacer";
import { Locale, localeNames } from "@dashboard/components/Locale";
import { LanguageCodeEnum } from "@dashboard/graphql";
import { capitalize } from "@dashboard/misc";
import { Text } from "@saleor/macaw-ui-next";
import React, { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

interface StaffPreferencesProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  handleLanguageCodeChange: (languageCode: LanguageCodeEnum) => void;
}

const StaffPreferences: React.FC<StaffPreferencesProps> = ({
  locale,
  onLocaleChange,
  handleLanguageCodeChange,
}) => {
  const intl = useIntl();
  const [languageCode, setLanguageCode] = useState("EN");
  const handleLocaleChange = async (locale: Locale) => {
    if (!locale) {
      return;
    }

    await onLocaleChange(locale);
    /*
      Workaround, after changing language we reload the page.
      saleor-sdk causes the error related to wrong cache management.
      Migration to auth-sdk can solve it.
      Ref: https://github.com/saleor/saleor-dashboard/issues/4340
    */
    window.location.reload();
  };

  return (
    <DashboardCard>
      <DashboardCard.Header>
        <DashboardCard.Title>
          {intl.formatMessage({
            id: "CLeDae",
            defaultMessage: "Preferences",
            description: "section header",
          })}
        </DashboardCard.Title>
      </DashboardCard.Header>
      <DashboardCard.Content>
        <Combobox
          helperText={intl.formatMessage({
            id: "JJgJwi",
            defaultMessage: "Selecting this will change the language of your dashboard",
          })}
          label={intl.formatMessage({
            id: "mr9jbO",
            defaultMessage: "Preferred Language",
          })}
          options={Object.values(Locale).map(locale => ({
            label: capitalize(localeNames[locale]),
            value: locale,
          }))}
          fetchOptions={() => undefined}
          name="locale"
          value={{
            label: localeNames[locale],
            value: locale,
          }}
          onChange={event => handleLocaleChange(event.target.value)}
        />

        <FormSpacer />
        <Text>
          <FormattedMessage
            id="e822us"
            defaultMessage="Please note, while all currency and date adjustments are complete, language translations are at varying degrees of completion."
          />
        </Text>
      </DashboardCard.Content>
      <DashboardCard.Content>
        <Combobox
          helperText={intl.formatMessage({
            id: "JJgJwj",
            defaultMessage: "Selecting this will change the language of your store front",
          })}
          label={intl.formatMessage({
            id: "mr9jbO",
            defaultMessage: "Preferred Language",
          })}
          options={Object.values(LanguageCodeEnum).map(code => ({
            // label: capitalize(localeNames[locale]),
            label: code,
            value: code,
          }))}
          fetchOptions={() => undefined}
          name="languageCode"
          value={{
            label: languageCode,
            value: languageCode,
          }}
          onChange={event => handleLanguageCodeChange(event.target.value)}
        />
      </DashboardCard.Content>
    </DashboardCard>
  );
};

StaffPreferences.displayName = "StaffPreferences";
export default StaffPreferences;

function mySettings(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">Pulsoid Settings</Text>}>
        <Oauth
          settingsKey="oauth"
          title="OAuth Login"
          label="Connect Pulsoid Account"
          status="Login"
          authorizeUrl="https://pulsoid.net/oauth2/authorize"
          requestTokenUrl="https://pulsoid.net/oauth2/token"
          clientId="1f8982cd-103e-4085-ae39-e0c9c940d9ed"
          clientSecret="asdfxxx"
          scope="data:heart_rate:write,news:read"
          pkce
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(mySettings);

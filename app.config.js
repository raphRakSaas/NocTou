const appConfiguration = require("./app.json");

module.exports = () => ({
  ...appConfiguration.expo,
  extra: {
    ...appConfiguration.expo.extra,
    openAgendaApiKey:
      process.env.OPEN_AGENDA_API_KEY ?? process.env.EXPO_PUBLIC_OPEN_AGENDA_API_KEY ?? null,
  },
});

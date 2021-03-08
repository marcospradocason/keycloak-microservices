<#macro registrationLayout header="">
<!DOCTYPE html>
<html lang="en" style="height: 100%">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow">

    <title>${msg("loginTitle",(realm.displayName!''))}</title>
    <link rel="icon" href="${url.resourcesPath}/img/favicon.ico" />
    <link rel="icon" href="${url.resourcesCommonPath}/img/favicon.ico" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
</head>
  <body style="height: 100%">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" style="height: 100%"></div>
    <script>
        var layout = {
            i18nEnabled: ${realm.internationalizationEnabled?string},
            <#if realm.internationalizationEnabled && locale.supported?size gt 1>
                locale: {
                    currentLocale: "${locale.current}",
                    locales: [
                        <#list locale.supported as l>
                            {
                                label: "${l.label}",
                                url: "${l.url}"
                            },
                        </#list>
                    ]
                },
            </#if>
            header: "${header}",
            username: "<#nested "show-username">",
            <#if auth?has_content && auth.showUsername()>
                attemptUsername: "${auth.attemptedUsername}",
            <#else>
                attemptUsername: null,
            </#if>
            loginRestartFlowUrl: "${url.loginRestartFlowUrl}",
            restartLoginTooltip: "${msg("restartLoginTooltip")}",
            <#if message?has_content>
                message: {type: "${message.type}", summary: "${message.summary}"},
            </#if>
            <#if isAppInitiatedAction??>
                isAppInitiatedAction: ${isAppInitiatedAction?string},
            <#else>
                isAppInitiatedAction: false,
            </#if>
            showTryAnotherWayLink: ${auth?has_content?then(auth.showTryAnotherWayLink()?string,"false")},
            loginAction: "${url.loginAction}",
            doTryAnotherWay: "${msg("doTryAnotherWay")}"
        }
    </script>
    <#nested "script-child">
    <!--
      This HTML file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
    -->
  </body>
</html>
</#macro>
<#import "base.ftl" as layout>
<%= macros %>
<@layout.registrationLayout header=msg("doLogIn"); section>
    <#if section = "script-child">
        <script>
            var child = {
                enabledPassword: ${realm.password?string},
                loginAction: "${url.loginAction}",
                <#if usernameEditDisabled??>
                    usernameEditDisabled: true,
                <#else>
                    usernameEditDisabled: false,
                </#if>
                <#if !realm.loginWithEmailAllowed>
                    usernameLabel: "${msg("username")}",
                <#elseif !realm.registrationEmailAsUsername>
                    usernameLabel: "${msg("usernameOrEmail")}",
                <#else>
                    usernameLabel: "${msg("email")}",
                </#if>
                usernameValue: "${(login.username!'')}",
                passwordLabel: "${msg("password")}",
                enabledRememberMe: ${realm.rememberMe?string},
                <#if login.rememberMe??>
                    enabledLoginRememberMe: ${login.rememberMe?string}
                </#if>
                rememberMeLabel: "${msg("rememberMe")}",
                resetPasswordAllowed: ${realm.resetPasswordAllowed?string},
                resetPasswordUrl: "${url.loginResetCredentialsUrl}",
                resetPasswordLabel: "${msg("doForgotPassword")}",
                <#if auth.selectedCredential?has_content>
                    selectedCredential: "${auth.selectedCredential}",
                </#if>
                submitLabel: "${msg("doLogIn")}",
                <#if realm.password && social.providers??>
                    socialProviders: [
                        <#list social.providers as p>
                            {
                                loginUrl: "${p.loginUrl}",
                                alias: "${p.alias}",
                                providerId: "${p.providerId}",
                                displayName: "${p.displayName}",
                            },
                        </#list>
                    ],
                </#if>
                <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
                    register: {
                        newUserLabel: "${msg("noAccount")}",
                        url: "${url.registrationUrl}",
                        registerLabel: "${msg("doRegister")}"
                    }
                </#if>
            }
        </script>
        <%= htmlWebpackPlugin.tags.bodyTags %>
    </#if>
</@layout.registrationLayout>
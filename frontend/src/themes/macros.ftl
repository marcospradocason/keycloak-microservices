<#macro url_resources_common url>
  <#assign url_exploded = url?split("/")>
  <#assign url_count = url_exploded?size>
  <#assign pos_change = url_count - 2>
  <#--  ${url}
  </#macro>  -->
${(url_exploded[0..pos_change-1] + ["common"])?join("/")}</#macro>
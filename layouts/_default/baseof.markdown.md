{{/* the following check avoids to print out content of headless bundles if called from nestedContent.gotmpl */}}
{{- if .RelPermalink -}}
# {{ partial "title.gotmpl" (dict "page" .) }}

{{ strings.TrimLeft "\n\r\t " .RawContent | safeHTML }}
{{- end }}
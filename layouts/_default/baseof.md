{{/* the following check avoids to print out content of headless bundles if called from nestedContent.gotmpl */}}
{{- if .RelPermalink }}
{{- .RawContent }}
{{- end }}

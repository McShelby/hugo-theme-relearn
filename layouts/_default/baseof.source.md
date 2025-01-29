{{/* the following check avoids to print out content of headless bundles if called from nestedContent.gotmpl */}}
{{- if and .File .File.Filename -}}
{{ readFile .File.Filename | safeHTML }}
{{- end }}
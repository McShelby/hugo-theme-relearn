{{- partialCached "page-meta.hugo" . . }}
{{- $pages := slice }}
{{- range .Site.Pages }}
{{- if and .Title (or (ne (.Scratch.Get "relearnIsHiddenStem") true) (ne .Site.Params.disableSearchHiddenPages true) ) }}
{{- $pages = $pages | append (dict "uri" .RelPermalink "title" .Title "tags" .Params.tags "description" .Description "content" (.Plain | htmlUnescape)) }}
{{- end }}
{{- end -}}
var relearn_search_index = {{ $pages | jsonify (dict "indent" "  ") }}

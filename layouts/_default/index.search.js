{{- partialCached "page-meta.hugo" . .RelPermalink }}
{{- $pages := slice }}
{{- range .Site.Pages }}
  {{- if and .Title (or (ne (.Scratch.Get "relearnIsHiddenStem") true) (ne .Site.Params.disableSearchHiddenPages true) ) }}
    {{- $title := .Title }}
    {{- if eq .Kind "taxonomy" }}
      {{- $title = i18n .Data.Plural }}
      {{- if not $title }}
        {{- $title = .Data.Plural }}
      {{- end }}
    {{- else if eq .Kind "term" }}
      {{- $title = i18n .Data.Singular }}
      {{- if not $title }}
        {{- $title = .Data.Singular }}
      {{- end }}
      {{- $title = printf "%s %s %s" $title (default "::" .Site.Params.titleSeparator) .Title }}
    {{- end }}
    {{- $pages = $pages | append (dict "uri" (partial "relLangPrettyUglyURL.hugo" (dict "to" .)) "title" $title "tags" .Params.tags "description" .Description "content" (.Plain | htmlUnescape)) }}
  {{- end }}
{{- end -}}
var relearn_search_index = {{ $pages | jsonify (dict "indent" "  ") }}

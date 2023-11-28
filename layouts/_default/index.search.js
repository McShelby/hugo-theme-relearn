{{- partialCached "page-meta.hugo" . .RelPermalink }}
{{- $pages := slice }}
{{- range .Site.Pages }}
  {{- if and .Title .RelPermalink (or (ne (.Scratch.Get "relearnIsHiddenStem") true) (ne .Site.Params.disableSearchHiddenPages true) ) }}
    {{- $title := .Title }}
    {{- if eq .Kind "taxonomy" }}
      {{- $title = default (default .Data.Plural (i18n .Data.Plural)) .Title }}
    {{- else if eq .Kind "term" }}
      {{- $taxonomy_page := .Site.GetPage .Data.Plural }}
      {{- $title = default (default .Data.Singular (i18n .Data.Singular)) $taxonomy_page.Params.SingularTitle }}
      {{- $title = printf "%s %s %s" $title (default "::" .Site.Params.titleSeparator) (default (humanize .Data.Term | strings.Title) .Title) }}
    {{- end }}
    {{- $pages = $pages | append (dict
      "uri" (partial "relLangPrettyUglyURL.hugo" (dict "to" .))
      "title" $title
      "tags" .Params.tags
      "breadcrumb" (trim ((partial "breadcrumbs.html" (dict "page" . "dirOnly" true)) | plainify | htmlUnescape) "\n\r\t ")
      "description" .Description
      "content" (.Plain | htmlUnescape)
    ) }}
  {{- end }}
{{- end -}}
var relearn_search_index = {{ $pages | jsonify (dict "indent" "  ") }}

{{- partialCached "page-meta.hugo" . .RelPermalink }}
{{- $pages := slice }}
{{- range .Site.Pages }}
  {{- if and .Title .RelPermalink (or (ne (.Scratch.Get "relearnIsHiddenStem") true) (ne .Site.Params.disableSearchHiddenPages true) ) }}
    {{- $tags := slice }}
    {{- range .GetTerms "tags" }}
      {{- $tags = $tags | append (partial "pageHelper/title.hugo" (dict "page" .Page "linkTitle" true) | plainify) }}
    {{- end }}
    {{- $pages = $pages | append (dict
      "uri" (partial "relLangPrettyUglyURL.hugo" (dict "to" .))
      "title" (partial "pageHelper/title.hugo" (dict "page" .) | plainify)
      "tags" $tags
      "breadcrumb" (trim (partial "breadcrumbs.html" (dict "page" . "dirOnly" true) | plainify | htmlUnescape) "\n\r\t ")
      "description" (trim (or .Description .Summary | plainify | htmlUnescape) "\n\r\t " )
      "content" (trim (.Plain | htmlUnescape) "\n\r\t ")
    ) }}
  {{- end }}
{{- end -}}
var relearn_search_index = {{ $pages | jsonify (dict "indent" "  ") }}

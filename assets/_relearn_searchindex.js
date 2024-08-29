{{- partialCached "relearn-meta.gotmpl" . .RelPermalink }}
{{- $pages := slice }}
{{- range .Site.Pages }}
  {{- if partial "_relearn/pageIsSpecial.gotmpl" . }}
  {{- else if and .Title .RelPermalink (or (ne (.Scratch.Get "relearnIsHiddenStem") true) (ne .Site.Params.disableSearchHiddenPages true) ) }}
    {{- $tags := slice }}
    {{- range .GetTerms "tags" }}
      {{- $tags = $tags | append (partial "title.gotmpl" (dict "page" .Page "linkTitle" true) | plainify) }}
    {{- end }}
    {{- $pages = $pages | append (dict
      "uri" (partial "permalink.gotmpl" (dict "to" .))
      "title" (partial "title.gotmpl" (dict "page" .) | plainify)
      "tags" $tags
      "breadcrumb" (trim (partial "breadcrumbs.html" (dict "page" . "dirOnly" true) | plainify | htmlUnescape) "\n\r\t ")
      "description" (trim (or .Description .Summary | plainify | htmlUnescape) "\n\r\t " )
      "content" (trim (.Plain | htmlUnescape) "\n\r\t ")
    ) }}
  {{- end }}
{{- end -}}
var relearn_searchindex = {{ $pages | jsonify (dict "indent" "  ") }}

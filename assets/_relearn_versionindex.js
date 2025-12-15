{{- $versions := partialCached "_relearn/siteVersions.gotmpl" site.Home -}}
var relearn_versionindex = {{ $versions | jsonify (dict "indent" "  ") }}

+++
categories = ['explanation', 'howto']
description = 'What the theme publishes with your site, as a CycloneDX SBOM'
title = 'SBOM'
weight = 9
+++

The theme ships a [CycloneDX](https://cyclonedx.org/) 1.6 SBOM at `sbom.cdx.json`, listing every third-party resource it can publish with your site, each with a license, a SHA-256 digest of the files the theme ships and - where upstream publishes them - a version and a package URL.

A component vendored as a single file carries that file's checksum in `hashes`. One vendored as a directory, or under several paths, has no single artifact to describe, so it carries one digest over every file it holds, across all its paths, as a `relearn:treehash` property instead - a directory holding only one file included, because that digest covers the names as well as the bytes and a rename inside the directory has to move the document. Some carry no version or package URL at all, because upstream publishes none.

> [!warning] Checksums describe the vendored file
> A `hashes` entry is the digest of the file as this theme ships it, which for most components is a minified build rather than the artifact the `purl` names. Fetching the package the coordinate points at and comparing digests will therefore not match, and that is expected rather than a sign of tampering. Use the checksum to verify the copy you received from the theme; use the `purl` to look the component up.

## Getting It

The file is part of the theme however you installed it, and is attached to each GitHub release

````sh
curl -LO https://github.com/McShelby/hugo-theme-relearn/releases/download/<version>/sbom.cdx.json
curl -LO https://github.com/McShelby/hugo-theme-relearn/releases/latest/download/sbom.cdx.json
````

It is not copied into your generated site. Nothing is served from your domain unless you put it there yourself.

## Verifying It

Releases attach a signed [build provenance attestation](https://docs.github.com/en/actions/security-for-github-actions/using-artifact-attestations/using-artifact-attestations-to-establish-provenance-for-builds) to the file, recording which workflow produced it and from which commit. If you have the [GitHub CLI](https://cli.github.com/)

````sh
gh attestation verify sbom.cdx.json --repo McShelby/hugo-theme-relearn
````

A copy that has been altered after the release, or that never came from this repository, fails the check. Attestations are looked up by the file's digest, so an altered copy typically fails by no attestation being found at all.

## Using It for Your Own Site

> [!note] This document describes the theme, not your site
> It lists everything the theme is *able* to publish, while your site publishes only what it uses - a site with no diagrams ships no Mermaid. It also says nothing about Hugo, your other modules, or your own content and assets.

Treat it as one input to your site's SBOM rather than as the finished document. Rather than copying its components into yours, reference it by [BOM-Link](https://cyclonedx.org/capabilities/bomlink/), built from the UUID inside the document's own `serialNumber` - that is, the field with its `urn:uuid:` prefix stripped - plus its `version`

````json
{
  "type": "bom",
  "url": "urn:cdx:<uuid>/<version>"
}
````

## Stability

The serial number and timestamp are derived rather than taken from a random number generator and the clock, so regenerating a given release produces the same bytes and a BOM-Link keeps naming what it named.

The serial number is a UUIDv5 over a digest of the document itself, so it names this exact document: it moves as soon as any component, version or checksum in it moves, and stays put when nothing does. Two documents that differ can therefore never share one BOM-Link.

To recompute it from the file alone, put `urn:uuid:00000000-0000-0000-0000-000000000000` back in place of the published serial, serialize the document as JSON without insignificant whitespace, in the key order the file has and with non-ASCII characters written as they are rather than escaped - which is what JavaScript's `JSON.stringify` produces - take the SHA-256 of its UTF-8 bytes, and derive the UUIDv5 over `pkg:github/mcshelby/hugo-theme-relearn@<theme version>?content=<digest>` with the digest in lowercase hex, in the standard URL namespace, where `<theme version>` is the document's own `metadata.component.version`.

The timestamp is the release date recorded in the changelog. The `version` in the BOM-Link is a different number again: it is CycloneDX's own revision counter, stays at `1`, because a changed document receives a new serial number rather than a new revision of the old one.

## What It Covers

Only what a site using the theme publishes. The resources used to build the documentation, develop the theme or run its releases are listed on the [credits](more/credits) page but deliberately left out of the SBOM, because your readers never receive them.

Bundles that compile or ship their own dependencies in are listed as single components marked with a `relearn:bundled` property, and what they contain is not enumerated. Those are the ones to look into if you are auditing licenses: the document does not say what they carry, and a bundle can carry something that is itself a bundle.

Components carrying local modifications record that as CycloneDX `pedigree`, so a vulnerability match against the upstream coordinate can account for the copy not being pristine.

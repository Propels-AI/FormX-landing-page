#!/usr/bin/env node
// One-shot script to self-host Webflow CDN tool-page assets.
// Run: node scripts/download-tool-assets.mjs

import { writeFileSync, mkdirSync } from 'fs';
import { dirname } from 'path';

const BASE = 'https://cdn.prod.website-files.com/65d1ef574683ac0a13f6ea25/';

const assets = [
  // Process step icons (shared across all tool pages)
  ['664187f502fd1abbd3dfc3fe_Paper%20Upload.svg',                                    'public/images/tools/icons/paper-upload.svg'],
  ['664187f1c826eef424d6c550_Swap.svg',                                              'public/images/tools/icons/swap.svg'],
  ['664187f53a3c496adf9638e1_Paper%20Download.svg',                                  'public/images/tools/icons/paper-download.svg'],

  // Use-case icons
  ['69d606570161ac0e5e6e6dba_icon-mortgage.svg',                                     'public/images/tools/icons/icon-mortgage.svg'],
  ['69d60665c2c4cc0a1f817ed4_icon-accounting.svg',                                   'public/images/tools/icons/icon-accounting.svg'],
  ['69d6066fa33d0fddae2f7ac6_icon-hr.svg',                                           'public/images/tools/icons/icon-hr.svg'],
  ['69d6067959f9bc4d7c2412d8_icon-screening.svg',                                    'public/images/tools/icons/icon-screening.svg'],
  ['69d606cde1f748f2a70cf756_icon-banking.svg',                                      'public/images/tools/icons/icon-banking.svg'],
  ['69d8d90e450e2297aa4ba835_icon-freelancer.svg',                                   'public/images/tools/icons/icon-freelancer.svg'],
  ['69d8d919bc5d777c17582164_icon-gig-worker.svg',                                   'public/images/tools/icons/icon-gig-worker.svg'],

  // ERP logos (invoice-ocr-api only)
  ['69c4ee0af20e1ea62beedd93_SAP%20S%3A4HANA%20%26%20Business%20One.svg',           'public/images/tools/erp/sap.svg'],
  ['69c4f555b98a5743c2f08ca2_Oracle%20NetSuite.svg',                                 'public/images/tools/erp/netsuite.svg'],
  ['69c4f74833188ed22db7adfc_QuickBooks%20Online%20%26%20Desktop.svg',               'public/images/tools/erp/quickbooks.svg'],
  ['69c4f8ecaf6da9e6ca5c56e5_c2c1f20d188dc7ad283c137129d18f60_Microsoft%20Dynamics%20365.svg', 'public/images/tools/erp/dynamics-365.svg'],
  ['69c5004417a5f47b25c945c6_b633b4279966012b7e108f79e0d537df_Any%20ERP%20via%20REST%20API.svg', 'public/images/tools/erp/rest-api.svg'],

  // Client trust logos (shared across all tool pages)
  ['663c69720e00b2411f1ee40f_logo-google.webp',                                      'public/images/tools/logos/logo-google.webp'],
  ['663c69720e00b2411f1ee42d_logo-wp.webp',                                          'public/images/tools/logos/logo-wp.webp'],
  ['663c69730e00b2411f1ee49e_logo.webp',                                             'public/images/tools/logos/logo-zapier.webp'],
  ['663c69730e00b2411f1ee495_LINK_REIT_logo.svg.webp',                               'public/images/tools/logos/logo-link-reit.webp'],
  ['663c69720e00b2411f1ee44e_logo-eds.webp',                                         'public/images/tools/logos/logo-eds.webp'],
  ['663c69720e00b2411f1ee464_logo-lks.webp',                                         'public/images/tools/logos/logo-lks.webp'],

  // API response JSON example SVGs (page-specific)
  ['69c63d51503aa8017460cc1f_84e23da3d233686c69f37694fd78bea1_minitool-invoice-json.svg', 'public/images/tools/examples/invoice-json-example.svg'],
  ['69d60a669c1f0dbd59a8d603_w2-json-example.svg',                                   'public/images/tools/examples/w2-json-example.svg'],
  ['69d8d9da68de3b71492b8ae0_1099-json-example.svg',                                 'public/images/tools/examples/1099-json-example.svg'],
  ['69dcc3ee563793e6cbcb17f6_p60-json-example.svg',                                  'public/images/tools/examples/p60-json-example.svg'],
];

let ok = 0, fail = 0;

for (const [cdnFile, dest] of assets) {
  const url = BASE + cdnFile;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    mkdirSync(dirname(dest), { recursive: true });
    writeFileSync(dest, buf);
    console.log(`✓  ${dest}`);
    ok++;
  } catch (e) {
    console.error(`✗  ${dest}  (${e.message})`);
    fail++;
  }
}

console.log(`\nDone: ${ok} downloaded, ${fail} failed.`);

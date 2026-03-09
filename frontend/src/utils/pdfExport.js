const fmt = (n) => {
  if (!n) return '—';
  return `\u20b9${Number(n).toLocaleString('en-IN')}`;
};

/**
 * Generate a multilingual PDF from plan data.
 * Uses html2pdf.js to capture a styled DOM element as PDF,
 * which preserves Devanagari, Gurmukhi, Gujarati scripts.
 */
export async function exportToPDF(planData, farmData, farmImage) {
  if (!planData) {
    throw new Error('No plan data available for PDF export');
  }

  let html2pdf;
  try {
    const module = await import('html2pdf.js');
    html2pdf = module.default;
  } catch (e) {
    console.error('[pdfExport] Failed to load html2pdf.js:', e);
    throw new Error('PDF library failed to load. Please try again.');
  }

  const container = document.createElement('div');
  container.style.cssText = 'position:absolute;left:-9999px;top:0;width:210mm;font-family:sans-serif;color:#1c1208;';

  const service = planData.recommendedService || 'Agritourism Plan';
  const tagline = planData.tagline || '';

  container.innerHTML = `
    <div style="padding:20px 24px;">
      <!-- Header -->
      <div style="background:#1a3a1a;color:#fff;padding:16px 20px;border-radius:8px;margin-bottom:20px;">
        <div style="font-size:20px;font-weight:700;">Chalo Kisaan</div>
        <div style="font-size:11px;opacity:0.8;margin-top:2px;">AI Agritourism Business Plan · Powered by AWS</div>
      </div>

      <!-- Title -->
      <div style="margin-bottom:16px;">
        <div style="font-size:22px;font-weight:700;color:#2e5c2e;">${esc(service)}</div>
        <div style="font-size:13px;color:#6b5a3e;font-style:italic;">"${esc(tagline)}"</div>
      </div>

      <!-- Farm Details -->
      <div style="background:#f8f5ef;padding:14px 18px;border-radius:6px;margin-bottom:16px;">
        <div style="font-size:13px;font-weight:700;margin-bottom:8px;color:#2e5c2e;">Farm Details</div>
        <table style="width:100%;font-size:12px;border-collapse:collapse;">
          <tr><td style="padding:3px 0;color:#6b5a3e;width:40%;">Location</td><td style="font-weight:600;">${esc(farmData?.location)}</td></tr>
          <tr><td style="padding:3px 0;color:#6b5a3e;">Land Size</td><td style="font-weight:600;">${esc(farmData?.landSize)} acres</td></tr>
          <tr><td style="padding:3px 0;color:#6b5a3e;">Soil Type</td><td style="font-weight:600;">${esc(farmData?.soilType)}</td></tr>
          <tr><td style="padding:3px 0;color:#6b5a3e;">Water Source</td><td style="font-weight:600;">${esc(farmData?.waterSource)}</td></tr>
          <tr><td style="padding:3px 0;color:#6b5a3e;">Budget</td><td style="font-weight:600;">${fmt(farmData?.budget)}</td></tr>
          <tr><td style="padding:3px 0;color:#6b5a3e;">Crops</td><td style="font-weight:600;">${esc(farmData?.biodiversity)}</td></tr>
        </table>
      </div>

      <!-- Key Metrics -->
      <div style="display:flex;gap:10px;margin-bottom:16px;">
        ${metricBox('Suitability', `${planData.suitabilityScore || 0}/100`, '#2e5c2e')}
        ${metricBox('Monthly Revenue', fmt(planData.monthlyRevenueEstimate), '#2e5c2e')}
        ${metricBox('Setup Cost', fmt(planData.totalSetupCost), '#b84c1c')}
        ${metricBox('Break-Even', `${planData.breakEvenMonths || '—'} months`, '#6b5a3e')}
      </div>

      <!-- Suitability Reason -->
      ${planData.suitabilityReason ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Why This Farm is Suitable</div>
        <div style="font-size:12px;line-height:1.5;">${esc(planData.suitabilityReason)}</div>
      </div>` : ''}

      <!-- Revenue Streams -->
      ${planData.revenueStreams?.length ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Revenue Streams</div>
        <table style="width:100%;font-size:12px;border-collapse:collapse;">
          <tr style="background:#f0ebe0;"><th style="text-align:left;padding:6px 8px;">Source</th><th style="text-align:right;padding:6px 8px;">Monthly</th></tr>
          ${planData.revenueStreams.map(s => `
            <tr style="border-bottom:1px solid #e8e0d0;">
              <td style="padding:5px 8px;">${esc(s.stream)}</td>
              <td style="text-align:right;padding:5px 8px;font-weight:600;">${fmt(s.monthlyRevenue)}</td>
            </tr>`).join('')}
          <tr style="background:#f0ebe0;font-weight:700;">
            <td style="padding:6px 8px;">Total</td>
            <td style="text-align:right;padding:6px 8px;">${fmt(planData.monthlyRevenueEstimate)}</td>
          </tr>
        </table>
      </div>` : ''}

      <!-- Setup Phases -->
      ${planData.setupPhases?.length ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Setup Plan</div>
        ${planData.setupPhases.map(p => `
          <div style="margin-bottom:8px;padding:8px 12px;background:#f8f5ef;border-radius:4px;border-left:3px solid #2e5c2e;">
            <div style="font-size:12px;font-weight:700;">Phase ${p.phase}: ${esc(p.title)}</div>
            <div style="font-size:11px;color:#6b5a3e;">${esc(p.duration)} · ${fmt(p.cost)}</div>
            ${p.tasks?.map(t => `<div style="font-size:11px;margin-top:2px;">✓ ${esc(t)}</div>`).join('') || ''}
          </div>`).join('')}
      </div>` : ''}

      <!-- Unique Experiences -->
      ${planData.uniqueExperiences?.length ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Unique Experiences</div>
        ${planData.uniqueExperiences.map((e, i) => `
          <div style="font-size:12px;margin-bottom:3px;">${i + 1}. ${esc(e)}</div>`).join('')}
      </div>` : ''}

      <!-- Government Schemes -->
      ${planData.govtSchemes?.length ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Government Schemes & Subsidies</div>
        ${planData.govtSchemes.map(s => `
          <div style="margin-bottom:6px;padding:6px 10px;background:#f8f5ef;border-radius:4px;">
            <div style="font-size:12px;font-weight:700;">${esc(s.name)}</div>
            <div style="font-size:11px;color:#6b5a3e;">Benefit: ${esc(s.benefit)}</div>
            <div style="font-size:11px;color:#6b5a3e;">Eligibility: ${esc(s.eligibility)}</div>
          </div>`).join('')}
      </div>` : ''}

      <!-- Risk Factors -->
      ${planData.riskFactors?.length ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Risk Factors</div>
        ${planData.riskFactors.map(r => `
          <div style="font-size:12px;margin-bottom:3px;">• ${esc(r)}</div>`).join('')}
      </div>` : ''}

      ${farmImage ? `
      <div style="margin-bottom:14px;">
        <div style="font-size:13px;font-weight:700;color:#2e5c2e;margin-bottom:6px;">Farm Photo</div>
        <img src="${farmImage}" style="max-width:100%;max-height:200px;border-radius:6px;" />
      </div>` : ''}

      <!-- Footer -->
      <div style="margin-top:20px;padding-top:12px;border-top:1px solid #d4c8a8;text-align:center;">
        <div style="font-size:10px;color:#a8936a;">Generated by Chalo Kisaan · Powered by AWS Bedrock · Team grACE</div>
        <div style="font-size:9px;color:#c4b896;margin-top:2px;">AI for Bharat Hackathon</div>
      </div>
    </div>
  `;

  document.body.appendChild(container);

  try {
    const filename = `ChaloKisaan_${(service).replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;

    const options = {
      margin: [5, 0, 5, 0],
      filename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, useCORS: true, allowTaint: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };

    console.log('[pdfExport] Starting PDF generation...');
    await html2pdf().from(container).set(options).save();
    console.log('[pdfExport] PDF generated successfully:', filename);
  } catch (e) {
    console.error('[pdfExport] Error during PDF generation:', e);
    throw new Error(`PDF generation failed: ${e.message}`);
  } finally {
    if (document.body.contains(container)) {
      document.body.removeChild(container);
    }
  }
}

function metricBox(label, value, color) {
  return `<div style="flex:1;background:#f8f5ef;padding:10px;border-radius:6px;text-align:center;">
    <div style="font-size:16px;font-weight:700;color:${color};">${value}</div>
    <div style="font-size:10px;color:#6b5a3e;margin-top:2px;">${label}</div>
  </div>`;
}

function esc(str) {
  if (!str) return '—';
  if (Array.isArray(str)) return str.join(', ') || '—';
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

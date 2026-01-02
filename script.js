/**
 * Widget Chat Híbrido - Lógica Principal
 * Propiedad de: Eliana "Rage" Avila (@rxgeit)
 * © Todos los derechos reservados.
 */

let totalEvents = 0;
let config = {};

window.addEventListener('onWidgetLoad', (obj) => {
    config = obj.detail.fieldData;
    
    // Alineación
    const align = config.globalAlign || 'left';
    document.getElementById('main-container').style.alignItems = align === 'right' ? 'flex-end' : 'flex-start';

    if (config.showEmotes === "false") document.body.classList.add('no-emotes');
    if (config.previewMode === "true") setTimeout(triggerPreview, 1000);
});

window.addEventListener('onEventReceived', (obj) => {
    const l = obj.detail.listener;
    const e = obj.detail.event;
    
    if (l === 'message') {
        // Filtros
        if (config.hideBots === 'yes') {
            const bots = (config.botNames || "").toLowerCase().split(',').map(s=>s.trim());
            if (bots.includes(e.data.displayName.toLowerCase())) return;
        }
        if (config.hideCommands === 'yes') {
            const prefixes = (config.commandPrefixes || "").split(',').map(s=>s.trim());
            if (prefixes.some(p => e.data.text.startsWith(p))) return;
        }

        const d = e.data; const t = d.tags; let r = 'reg';
        if (t.mod === "1" || t.broadcaster === "1") r = 'mod';
        else if (t.vip === "1") r = 'vip';
        else if (t.subscriber === "1") r = 'sub';
        
        renderChat(d.displayName, d.text, r);
    } else handleAlerts(l, e);
});

function handleAlerts(l, e) {
    let i = 'icon-evt-follow'; let r = 'f'; let a = config.tFollow;
    if (l === 'subscriber-latest') { i = 'icon-evt-sub'; r = 's'; a = e.amount > 1 ? config.tResub : config.tSub; }
    else if (l === 'tip-latest') { i = 'icon-evt-donar'; r = 't'; a = config.tTip; }
    else if (l === 'cheer-latest') { i = 'icon-evt-tips'; r = 'c'; a = config.tCheer; }
    renderAlert(i, e.name || "User", a, e.amount || "", r);
}

function getStyle(r) {
    const borderBg = config[r + 'BorderType'] === 'grad' 
        ? `linear-gradient(90deg, ${config[r + 'BStart']}, ${config[r + 'BEnd']})` 
        : config[r + 'BSolid'];
        
    const innerBg = config[r + 'InnerType'] === 'grad'
        ? `linear-gradient(90deg, ${config[r + 'InStart']}, ${config[r + 'InEnd']})`
        : config[r + 'InSolid'];

    const hasBorder = config[r + 'BorderShow'] === 'yes';
    
    const isChat = ['reg', 'sub', 'mod', 'vip'].includes(r);
    const padding = isChat ? config.chatGap : config.eventGap;

    const txtName = config[r + 'TxtName'] || config[r + 'Txt'];
    const txtMsg = config[r + 'TxtMsg'] || config[r + 'Txt'];

    return `
        --out-bg: ${config[r + 'OutBg']};
        --padding-gap: ${padding}px;
        --b-thick: ${hasBorder ? config.borderThickness : 0}px;
        --b-grad: ${borderBg};
        --in-bg: ${innerBg};
        --txt-color: ${config[r + 'Txt']};
        --txt-name: ${txtName};
        --txt-msg: ${txtMsg};
        --badge-bg: ${config[r + 'BadgeBg']};
        --badge-txt: ${config[r + 'BadgeTxt']};
        --ico-color: ${config[r + 'IconColor']};
    `;
}

function renderChat(u, m, r) {
    const s = getStyle(r);
    const i = `chat-icon-${r}`;
    const side = (r === 'mod' || r === 'vip') ? `right: ${config[r+'PosSide']}px; left: auto;` : `left: ${config[r+'PosSide']}px;`;
    const h = `<div class="entry-row type-${r}" style="${s}">
        <div class="chat-badge" style="top:${config[r+'PosTop']}px; ${side}">
            <svg class="badge-svg"><use xlink:href="#${i}"></use></svg><span>${u}</span>
        </div>
        <div class="outer-box"><div class="border-layer"><div class="content-layer">
            <span>${m}</span>
        </div></div></div>
    </div>`;
    append(h);
}

function renderAlert(i, n, a, m, r) {
    const s = getStyle(r);
    const h = `<div class="entry-row type-alert type-evt-${r}" style="${s}">
        <div class="outer-box"><div class="border-layer"><div class="content-layer alert-content">
            <svg class="svg-icon"><use xlink:href="#${i}"></use></svg>
            <div><span class="ev-name">${n}</span> <span class="ev-action">${a}</span> <span class="ev-amount">${m}</span></div>
        </div></div></div>
    </div>`;
    append(h);
}

function append(h) {
    const c = document.getElementById('main-container');
    const w = document.createElement('div'); w.innerHTML = h; const el = w.firstChild;
    c.appendChild(el); totalEvents++;
    setTimeout(() => { 
        el.classList.add('removing'); 
        setTimeout(() => { if(el.parentNode) el.parentNode.removeChild(el); totalEvents--; }, 500); 
    }, config.hideDelay * 1000);
    if (totalEvents > 12) { const o = c.firstChild; o.classList.add('removing'); setTimeout(() => c.removeChild(o), 400); totalEvents--; }
}

function triggerPreview() {
    renderChat("Streamer", "¡Mensaje de prueba con tu fuente elegida!", "mod");
    setTimeout(() => handleAlerts('follower-latest', {name: "Seguidor"}), 1500);
    setTimeout(() => renderChat("Suscriptor", "Probando...", "sub"), 3000);
    setTimeout(() => handleAlerts('tip-latest', {name: "Donador", amount: "$50"}), 4500);
    setTimeout(() => handleAlerts('cheer-latest', {name: "CheerUser", amount: "100"}), 6000);
}

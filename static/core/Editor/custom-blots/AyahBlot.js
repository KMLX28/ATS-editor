class AyahBlot extends Inline {
    static create(ayahDetails) {
        let node = super.create();
        node.dataset.ayahNumber = ayahDetails.ayahNumber;
        node.dataset.surahNumber = ayahDetails.surahNumber;
        node.dataset.surahName = ayahDetails.surahName;

        tippy(node, {
            content: ` الآية: ${node.dataset.ayahNumber} <br> ${node.dataset.surahName}`,
        });
        return node;
    }
}

AyahBlot.blotName = 'Ayah';
AyahBlot.className = 'ql-ayah';
AyahBlot.tagName = 'div';
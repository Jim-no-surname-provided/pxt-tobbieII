LOCALES = [
    "en",
    "ar",
    "bg",
    "ca",
    "cs",
    "cy",
    "da",
    "de",
    "el",
    "es-ES",
    "fi",
    "fr",
    "gn",
    "he",
    "hu",
    "is",
    "it",
    "ja",
    "ko",
    "lo",
    "nl",
    "nb",
    "nn-NO",
    "pl",
    "pt-BR",
    "pt-PT",
    "ru",
    "si-LK",
    "sk",
    "sr",
    "sv-SE",
    "tr",
    "uk",
    "vi",
    "zh-CN",
    "zh-TW",
]

STAMP_BLOCK_TRANSLATIONS = {
    "en": {"tobbieIIv2.stamp|block": "stamp %time| times"},
    "ar": {"tobbieIIv2.stamp|block": "اضرب الأرض بقدمك %time| مرات"},
    "bg": {"tobbieIIv2.stamp|block": "тропни %time| пъти"},
    "ca": {"tobbieIIv2.stamp|block": "pica de peus %time| vegades"},
    "cs": {"tobbieIIv2.stamp|block": "dupni %time| krát"},
    "cy": {"tobbieIIv2.stamp|block": "stampio %time| gwaith"},
    "da": {"tobbieIIv2.stamp|block": "stamp %time| gange"},
    "de": {"tobbieIIv2.stamp|block": "%time| Mal stampfen"},
    "el": {"tobbieIIv2.stamp|block": "χτύπα το πόδι %time| φορές"},
    "es-ES": {"tobbieIIv2.stamp|block": "pisa fuerte %time| veces"},
    "fi": {"tobbieIIv2.stamp|block": "tömisytä %time| kertaa"},
    "fr": {"tobbieIIv2.stamp|block": "taper du pied %time| fois"},
    "gn": {"tobbieIIv2.stamp|block": "epyrũ hatã %time| jey"},
    "he": {"tobbieIIv2.stamp|block": "רקע ברגל %time| פעמים"},
    "hu": {"tobbieIIv2.stamp|block": "dobbants %time| alkalommal"},
    "is": {"tobbieIIv2.stamp|block": "stappaðu %time| sinnum"},
    "it": {"tobbieIIv2.stamp|block": "batti il piede %time| volte"},
    "ja": {"tobbieIIv2.stamp|block": "%time| 回足踏みする"},
    "ko": {"tobbieIIv2.stamp|block": "%time| 번 발 구르기"},
    "lo": {"tobbieIIv2.stamp|block": "ຢ່ຳຕີນ %time| ເທື່ອ"},
    "nl": {"tobbieIIv2.stamp|block": "%time| keer stampen"},
    "nb": {"tobbieIIv2.stamp|block": "stamp %time| ganger"},
    "nn-NO": {"tobbieIIv2.stamp|block": "stamp %time| gonger"},
    "pl": {"tobbieIIv2.stamp|block": "tupnij %time| razy"},
    "pt-BR": {"tobbieIIv2.stamp|block": "bata o pé %time| vezes"},
    "pt-PT": {"tobbieIIv2.stamp|block": "bate o pé %time| vezes"},
    "ru": {"tobbieIIv2.stamp|block": "топни %time| раз"},
    "si-LK": {"tobbieIIv2.stamp|block": "පාද ගසන්න %time| වර"},
    "sk": {"tobbieIIv2.stamp|block": "dupni %time| krát"},
    "sr": {"tobbieIIv2.stamp|block": "лупни ногом %time| пута"},
    "sv-SE": {"tobbieIIv2.stamp|block": "stampa %time| gånger"},
    "tr": {"tobbieIIv2.stamp|block": "%time| kez ayağını yere vur"},
    "uk": {"tobbieIIv2.stamp|block": "тупни %time| разів"},
    "vi": {"tobbieIIv2.stamp|block": "dậm chân %time| lần"},
    "zh-CN": {"tobbieIIv2.stamp|block": "跺脚 %time| 次"},
    "zh-TW": {"tobbieIIv2.stamp|block": "跺腳 %time| 次"},
}

import json
from pathlib import Path

for locale in LOCALES:
    json_path = Path("_locales") / locale / "tobbie_ii-strings.json"

    with json_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    data.update(STAMP_BLOCK_TRANSLATIONS[locale])

    with json_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

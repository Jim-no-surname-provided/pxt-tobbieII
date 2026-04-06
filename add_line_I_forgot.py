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
    "en": {"TobbieII.stamp|block": "Stamp %time| times"},
    "ar": {"TobbieII.stamp|block": "اضرب الأرض بقدمك %time| مرات"},
    "bg": {"TobbieII.stamp|block": "Тропни %time| пъти"},
    "ca": {"TobbieII.stamp|block": "Pica de peus %time| vegades"},
    "cs": {"TobbieII.stamp|block": "Dupni %time| krát"},
    "cy": {"TobbieII.stamp|block": "Stampio %time| gwaith"},
    "da": {"TobbieII.stamp|block": "Stamp %time| gange"},
    "de": {"TobbieII.stamp|block": "%time| Mal stampfen"},
    "el": {"TobbieII.stamp|block": "Χτύπα το πόδι %time| φορές"},
    "es-ES": {"TobbieII.stamp|block": "Pisa fuerte %time| veces"},
    "fi": {"TobbieII.stamp|block": "Tömisytä %time| kertaa"},
    "fr": {"TobbieII.stamp|block": "Taper du pied %time| fois"},
    "gn": {"TobbieII.stamp|block": "Epyrũ hatã %time| jey"},
    "he": {"TobbieII.stamp|block": "רקע ברגל %time| פעמים"},
    "hu": {"TobbieII.stamp|block": "Dobbants %time| alkalommal"},
    "is": {"TobbieII.stamp|block": "Stappaðu %time| sinnum"},
    "it": {"TobbieII.stamp|block": "Batti il piede %time| volte"},
    "ja": {"TobbieII.stamp|block": "%time| 回足踏みする"},
    "ko": {"TobbieII.stamp|block": "%time| 번 발 구르기"},
    "lo": {"TobbieII.stamp|block": "ຢ່ຳຕີນ %time| ເທື່ອ"},
    "nl": {"TobbieII.stamp|block": "%time| keer stampen"},
    "nb": {"TobbieII.stamp|block": "Stamp %time| ganger"},
    "nn-NO": {"TobbieII.stamp|block": "Stamp %time| gonger"},
    "pl": {"TobbieII.stamp|block": "Tupnij %time| razy"},
    "pt-BR": {"TobbieII.stamp|block": "Bata o pé %time| vezes"},
    "pt-PT": {"TobbieII.stamp|block": "Bate o pé %time| vezes"},
    "ru": {"TobbieII.stamp|block": "Топни %time| раз"},
    "si-LK": {"TobbieII.stamp|block": "පාද ගසන්න %time| වර"},
    "sk": {"TobbieII.stamp|block": "Dupni %time| krát"},
    "sr": {"TobbieII.stamp|block": "Лупни ногом %time| пута"},
    "sv-SE": {"TobbieII.stamp|block": "Stampa %time| gånger"},
    "tr": {"TobbieII.stamp|block": "%time| kez ayağını yere vur"},
    "uk": {"TobbieII.stamp|block": "Тупни %time| разів"},
    "vi": {"TobbieII.stamp|block": "Dậm chân %time| lần"},
    "zh-CN": {"TobbieII.stamp|block": "跺脚 %time| 次"},
    "zh-TW": {"TobbieII.stamp|block": "跺腳 %time| 次"},
}

import json
from pathlib import Path

for locale in LOCALES:
    json_path = Path("_locales") / locale / "TobbieII-strings.json"

    with json_path.open("r", encoding="utf-8") as f:
        data = json.load(f)

    data.update(STAMP_BLOCK_TRANSLATIONS[locale])

    with json_path.open("w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write("\n")

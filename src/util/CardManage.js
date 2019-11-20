const showMask = (_card) => {
    let _text = _card.rarity.text;
    let _isHave = _card.is_have;
    let _bl = false;

    switch (_text) {
        case 'C':
        case 'U':
        case 'R':
        case 'S':
        case 'SR':
            _bl = false;
            break;
        case '金SR':
            _bl = true;
            break;
        case 'HSR':
            _bl = _isHave == 1 ? true : false;
            break;
    }
    return _bl;
}
const showFilter = (_card) => {
    let _text = _card.rarity.text;
    let _isHave = _card.is_have;
    let _bl = false;

    switch (_text) {
        case 'C':
        case 'U':
            _bl = false;
            break;
        case 'R':
        case 'S':
        case 'SR':
        case '金SR':
            _bl = true;
            break;
        case 'HSR':
            _bl = _isHave == 1 ? true : false;
        break;
    }
    return _bl;
}
const isHideCard = (_card) => {
    let _text = _card.rarity.text;
    let _bl = false;

    switch (_text) {
        case 'HSR':
            _bl = true;
        break;
    }
    return _bl;
}

export default {
    showFilter,
    showMask,
    isHideCard
}
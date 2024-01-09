import { PlayerProps } from "../../../../lib/types";

const numberHint = (sol: number, p: number) => {
    if (sol === p) {
        return "✅";
    } else if (sol > p) {
        return "⬆️";
    } else return "⬇️";
};

const countryHint = (sol: string, p: string) => {
    if (sol === p) {
        return "✅";
    } else return "❌";
};

const rankHint = (sol: number, p: number) => {
    if (sol === p) {
        return "✅";
    } else if (sol < p) {
        return "⬆️";
    } else return "⬇️";
};

const genHintString = (pp: PlayerProps, sp: PlayerProps) => {
    return [
        rankHint(sp.rank, pp.rank),
        countryHint(sp.country, pp.country),
        numberHint(sp.playcount, pp.playcount),
        numberHint(sp.id, pp.id),
    ];
};

export default genHintString;

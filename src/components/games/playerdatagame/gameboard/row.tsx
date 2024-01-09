type Props = {
    guessNum: string;
    id: string;
    username: string;
    country: string;
    rank: string;
    playcount: string;
};

function Row({ guessNum, id, username, country, rank, playcount }: Props) {
    return (
        <tr>
            <td>{guessNum}</td>
            <td>{username}</td>
            <td>{rank}</td>
            <td>{country}</td>
            <td>{playcount}</td>
            <td>{id}</td>
        </tr>
    );
}

export default Row;

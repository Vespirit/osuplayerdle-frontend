import "./table.css";

// components
import Row from "./row";
//types
import { PlayerProps } from "../../../../lib/types";

type Props = {
    guessProps: PlayerProps[];
    guessHints: string[][];
};
function Table({ guessProps, guessHints }: Props) {
    return (
        <center>
            <table
                className="table"
                width="100%"
            >
                <thead>
                    <tr>
                        <td>Guess</td>
                        <td>Username</td>
                        <td>Rank</td>
                        <td>Country</td>
                        <td>Playcount</td>
                        <td>ID</td>
                        {
                            // TODO: don't hardcode the table properties
                        }
                    </tr>
                </thead>
                <tbody>
                    {guessProps.map((guessProps: PlayerProps, i: number) => {
                        return (
                            <Row
                                key={i}
                                guessNum={(i + 1).toString()}
                                id={guessProps.id + " " + guessHints[i][3]}
                                username={guessProps.username}
                                country={
                                    guessProps.country + " " + guessHints[i][1]
                                }
                                rank={guessProps.rank + " " + guessHints[i][0]}
                                playcount={
                                    guessProps.playcount +
                                    " " +
                                    guessHints[i][2]
                                }
                            />
                        );
                    })}
                </tbody>
            </table>
        </center>
    );
}

export default Table;

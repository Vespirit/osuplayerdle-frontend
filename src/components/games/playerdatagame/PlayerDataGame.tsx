import { useEffect, useState } from "react";

// components
import Table from "./gameboard/table";
import PlayerForm from "../../playerform/PlayerForm";

// tools
import { startOfToday } from "date-fns";
import { getRandomInt } from "../../../lib/random";
import { PlayerProps } from "../../../lib/types";
import hint from "./lib/hints";
import axios, { AxiosResponse } from "axios";

function PlayerDataGame() {
    const [isLoading, setIsLoading] = useState<boolean>(true); // state for if api is being fetched

    const [solution, setSolution] = useState<string>("");
    const [solutionProps, setSolutionProps] = useState<PlayerProps>({
        id: 0,
        username: "",
        country: "",
        playcount: 0,
        rank: 0,
    });
    const [usernames, setUsernames] = useState<string[]>([]); // list of usernames

    const [guessList, setGuessList] = useState<string[]>([]);
    const [guessProps, setGuessProps] = useState<PlayerProps[]>([]);
    const [guessHints, setGuessHints] = useState<string[][]>([]); // emojis used for guess hints and "share results" button
    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [attempts, setAttempts] = useState<number>(1);
    const [msg, setMsg] = useState<string>("");
    const [shareConfirmation, setShareConfirmation] = useState<string>("");

    const fetchPlayer = async (username: string) => {
        const res: AxiosResponse = await axios.get(`/api/players/${username}`);
        return res.data[0];
    };

    const fetchPlayers = async () => {
        const res: AxiosResponse = await axios.get("/api/players");
        return res.data;
    };

    useEffect(() => {
        fetchPlayers().then((usernameList: string[]) => {
            setUsernames(usernameList);
            const solIdx: number = getRandomInt(
                0,
                usernameList.length,
                startOfToday().getTime()
            ); // choose a solution out of the username list
            setSolution(usernameList[solIdx]);
            fetchPlayer(usernameList[solIdx]).then((sol: PlayerProps) => {
                setSolutionProps(sol);
            });
        });
        setIsLoading(false);
    }, []);

    const handleInputSubmit = (inputText: string) => {
        /* assumes inputText is valid in the username list
         */
        if (isGameOver) return; // guesses don't work after game ends

        const curGuess = inputText.trim();
        if (curGuess === "") return; // can't submit empty guesses
        if (guessList.includes(curGuess)) return; // can't submit duplicate guesses

        setGuessList([...guessList, curGuess]);

        if (curGuess === solution) {
            setGuessProps([...guessProps, solutionProps]);
            setGuessHints([...guessHints, hint(solutionProps, solutionProps)]);
            setIsGameOver(true);
            setMsg(
                "Well done! Got it in " + attempts.toString() + " attempt(s)."
            );
            return;
        }

        fetchPlayer(curGuess).then((pp) => {
            console.log(pp);
            setGuessProps([...guessProps, pp]);
            setGuessHints([...guessHints, hint(pp, solutionProps)]);
        });

        if (attempts >= 6) {
            setIsGameOver(true);
            setMsg("Game over! Correct answer: " + solution);
        } else {
            setAttempts(attempts + 1);
        }
    };

    const copyResults = async () => {
        await window.navigator.clipboard
            .writeText(
                guessHints.reduce(
                    (acc, guessHint) => acc + guessHint.join("") + "\n",
                    "osu!playerdle results\n"
                ) + "Play at <url>"
            )
            .then(() => {
                setShareConfirmation("Results copied to clipboard.");
            })
            .catch((err: any) => {
                setShareConfirmation("Unable to copy to clipboard " + err);
            });
    };

    return (
        <div className="PlayerDataGame">
            {guessList.length > 0 && ( // only show guess table when non-empty
                <Table
                    guessProps={guessProps}
                    guessHints={guessHints}
                />
            )}
            {!isGameOver && !isLoading && (
                <PlayerForm
                    onSubmit={handleInputSubmit}
                    inputOptions={usernames}
                />
            )}
            {isGameOver && (
                <div className="Popup">
                    <p>{msg}</p>
                    <button
                        id="shareButton"
                        onClick={copyResults}
                    >
                        Share
                    </button>
                    <p>{shareConfirmation}</p>
                </div>
            )}
        </div>
    );
}

export default PlayerDataGame;

import { useState } from "react";
import "./PlayerForm.css";

type Props = {
    inputOptions: string[];
    onSubmit: (inputText: string) => void;
};

function PlayerForm({ inputOptions, onSubmit }: Props) {
    const [inputText, setInputText] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [inputOptionsFiltered, setInputOptionsFiltered] = useState<string[]>(
        []
    );

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputText = e.target.value;
        setInputText(newInputText);
        setIsDropdownOpen(newInputText.length > 0); // only show dropdown if text isnt empty

        const filtered: string[] = inputOptions
            .filter((option: string) =>
                option.toLowerCase().includes(newInputText.toLowerCase())
            )
            .slice(0, 10); // filtered options contains a max of 10 options
        setInputOptionsFiltered(filtered);
    };

    const handleOptionClick = (option: string) => {
        setInputText(option);
        setIsDropdownOpen(false);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!inputOptions.includes(inputText)) return;

        onSubmit(inputText);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="textbox"
                name="input-player"
                type="text"
                placeholder="Type a player's name!"
                value={inputText}
                onChange={handleInputChange}
            />
            <button
                className="submit"
                type="submit"
            >
                Guess!
            </button>
            {isDropdownOpen && (
                <div className="dropdown-options">
                    {inputOptionsFiltered.map((option) => (
                        <button
                            key={option}
                            className="dropdown-option"
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </form>
    );
}

export default PlayerForm;

import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PropTypes from 'prop-types';

ShowTags.propTypes = {
    setTag: PropTypes.func,
    checked: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
};

function ShowTags(props) {
    return (
        <label className="text-mywhite bg-myGray mx-2 p-2 rounded-xl">
            <input
                type="radio"
                className="mx-1"
                checked={props.checked == props.value}
                onChange={() => props.setTag(props.value)}
            />
            <span className="mx-1">{props.label}</span>
        </label>
    );
}

export default function Search() {
    const [game, setGame] = useState('');
    const [brand, setBrand] = useState('');

    const gameList = ["FH4", "FH5"];
    const brandList = ["BMW", "Audi", "Ferrari", "Lamborghini"];

    console.log(game);
    console.log(brand);
    return (
        <div className="flex flex-col absolute">
            <section className="h-[100vh] w-[100vw] items-center flex flex-col justify-center md:snap-center gap-y-40">
                <div>
                    <Typography variant="h1" className="text-myRed3">Search Page</Typography>
                    <Typography variant="lead" className="text-myGray">tag and discover.</Typography>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-row items-center justify-center">
                        <Typography
                            variant="paragraph"
                            className="text-myRed3 text-lg font-medium"
                        >
                            Select Game
                        </Typography>
                        {
                            gameList.map((g, id) => {
                                return (
                                    <ShowTags setTag={setGame} checked={game} label={g} value={g} key={id} />
                                );
                            })
                        }
                    </div>
                    <div className="flex flex-row items-center justify-center">
                        <Typography
                            variant="paragraph"
                            className="text-myRed3 text-lg font-medium"
                        >
                            Select Brand
                        </Typography>
                        {
                            brandList.map((b, id) => {
                                return (
                                    <ShowTags setTag={setBrand} checked={brand} label={b} value={b} key={id} />
                                );
                            })
                        }
                    </div>
                </div>
            </section>
        </div>
    );
}
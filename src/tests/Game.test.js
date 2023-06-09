import React from "react";
import { render, screen } from "@testing-library/react";
import Game from '../components/Game';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

const images = [
    { link: 'https://i.imgur.com/9AV8Pm5.jpg', name: 'Central Park', id: 'centralPark' },
    { link: 'https://i.imgur.com/GcajWP8.jpg', name: 'Green Goblin', id: 'greenGoblin' },
    { link: 'https://i.imgur.com/2TYdu9B.jpg', name: 'Mister Negative', id: 'misterNegative' },
    { link: 'https://i.imgur.com/F0yqph0.jpg', name: 'Vulture', id: 'vulture' }
];

describe("Game functions", () => {
    it("loads the correct image upon game selection", async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={[{
                pathname: '/',
                state: {
                    image: images[0] // Central Park
                }
            }]}>
                <Game />
            </MemoryRouter>
        );
        await user.click(screen.getByAltText('Central Park'));
        
        expect((await screen.findAllByRole('listitem')).length).toBe(3);        
    });

});
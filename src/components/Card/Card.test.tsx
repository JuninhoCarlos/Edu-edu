import React from "react";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";
import Card, { CardProps } from "./Card";

const renderCard = (props: Partial<CardProps> = {}) => {
    const defaultProps: CardProps = {
        nome: "joaozinho",
        ano: 1,
    };
    return shallow(<Card {...defaultProps} {...props} />);
};

describe("Test the Card component", () => {
    let component: any;
    beforeEach(() => {});

    test("Should Display a default card without passing an Avatar url", async () => {
        component = renderCard();
        const nome = component.find(`[data-test="nome"]`);
        console.log(nome.debug());
        console.log(nome);
        expect(nome.text()).toBe("joaozinho");

        const ano = component.find(`[data-test="ano"]`);
        expect(ano.text()).toBe("1º Ano");
        const avatar = component.find(`[data-test="avatarUrl"]`);
        expect(avatar).toBeDefined();
    });

    /*
    test("Should Display a Card with an specific url to the avatar", async () => {
        const { findByTestId } = renderCard({
            nome: "Thiago",
            ano: 2,
            avatarUrl: "avatar.png",
        });
        const nome = await findByTestId("nome");
        expect(nome).toHaveTextContent("Thiago");
        const ano = await findByTestId("ano");
        expect(ano).toHaveTextContent("2º Ano");
        const avatar = await findByTestId("avatarUrl");
        expect(avatar).toHaveAttribute("src", "avatar.png");
    });*/
});

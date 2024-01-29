import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./Login";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockNavigate
}))

describe("Login", () => {
    describe("컴포넌트가 렌더링되었을 때", () => {
        it("아이디 입력창이 표시된다", () => {
            // when
            render(<Login/>);
    
            // then
            expect(screen.getByPlaceholderText("아이디를 입력하세요")).toBeInTheDocument();
        });
    });

    describe("로그인 버튼을 눌렀을 때", () => {
        describe("아이디가 입력되어 있지 않다면", () => {
            it("아이디 입력창에 커서가 포커스된다", () => {
                // given
                render(<Login/>);

                const passwordInput = screen.getByPlaceholderText("비밀번호를 입력하세요");
                fireEvent.change(passwordInput, {target: {value: "password123"}});

                // when
                fireEvent.click(screen.getByTestId("login-button"));

                // then
                expect(screen.getByPlaceholderText("아이디를 입력하세요")).toHaveFocus();
            });
        });
    });

    describe("로그인 버튼을 눌렀을 때", () => {
        describe("비밀번호가 입력되어 있지 않다면", () => {
            it("비밀번호 입력창에 .red 클래스가 추가된다", () => {
                // given
                render(<Login/>);
                
                const idInput = screen.getByPlaceholderText("아이디를 입력하세요");
                fireEvent.change(idInput, {target: {value: "id123"}});

                // when
                fireEvent.click(screen.getByTestId("login-button"));

                // then
                expect(screen.getByPlaceholderText("비밀번호를 입력하세요")).toHaveClass("red");
            });
        });
    });

    describe("로그인 버튼을 눌렀을 때", () => {
        describe("모든 정보가 입력되어 있다면", () => {
            let mockAdapter: MockAdapter;

            beforeAll(() => {
                mockAdapter = new MockAdapter(axios);
            });

            it("서버에 로그인 요청을 보내고, 성공시 화면에 로그인 성공 메시지를 표시한다", async () => {
                // given
                mockAdapter.onGet("http://www.doringri.com").reply(200, {
                    data: {
                        id: "id123"
                    }
                });

                render(<Login/>);
                
                const idInput = screen.getByPlaceholderText("아이디를 입력하세요");
                const passwordInput = screen.getByPlaceholderText("비밀번호를 입력하세요");
                fireEvent.change(idInput, {target: {value: "id123"}});
                fireEvent.change(passwordInput, {target: {value: "password123"}});

                // when
                fireEvent.click(screen.getByTestId("login-button"));

                // then
                await waitFor(() => expect(screen.findByText("id123님 환영합니다.")));
            });
        });
    });

    describe("홈 버튼을 눌렀다면", () => {
        it("홈 화면으로 이동한다", () => {
            // given
            render(<Login/>);

            // when
            fireEvent.click(screen.getByTestId("home-button"));

            // then
            expect(mockNavigate).toBeCalled();
        });
    });
});

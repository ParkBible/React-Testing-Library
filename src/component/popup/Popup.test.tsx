import { fireEvent, render, screen } from "@testing-library/react";
import Popup from "./Popup";

describe("Popup", () => {
    describe("닫기 버튼을 눌렀다면", () => {
        it("상위 컴포넌트에 닫기 동작을 요청한다", () => {
            // given
            const mockSetIsShow = jest.fn();
            render(<Popup setIsShow={mockSetIsShow}/>);

            // when
            fireEvent.click(screen.getByTestId("close-button"));

            // then
            expect(mockSetIsShow).toBeCalledWith(false);
        });
    });
});
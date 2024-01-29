import "./style.css";

export default function Popup(props: {
    setIsShow: (isShow: boolean) => void
}) {
    const onCloseClick = () => {
        props.setIsShow(false);
    }

    return (
        <div className="popup-wrap">
            팝업 예시
            <button onClick={onCloseClick} data-testid="close-button">
                닫기
            </button>
        </div>
    )
}
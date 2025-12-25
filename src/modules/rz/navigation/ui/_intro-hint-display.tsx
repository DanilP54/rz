export function IntroHintDisplay({text}: { text: string }) {
    return (
        <div className="absolute top-0 flex h-[120px] items-center right-0 w-[calc(100%-35px)]">
            <div className="flex items-center justify-center text-center px-3">
                <span className="grow font-bold text-xs">{text}</span>
            </div>
        </div>
    );
}
export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4 overflow-scroll ">
            <div className="container fit-card ">
                {children}
            </div>
        </div>
    );
}
export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4 ">
            <div className="container overflow-auto fit-card ">
                {children}
            </div>
        </div>
    );
}
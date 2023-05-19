export { Layout };

function Layout({ children }) {
    return (
        <div className="p-4">
            <div className="container-sm">
                {children}
            </div>
        </div>
    );
}
import Frame from '../frame'

export default function Layout({ children }) {
    return (
        <>
            <Frame />
            <main>{children}</main>
        </>
    )
}
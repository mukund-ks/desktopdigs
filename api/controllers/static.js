export const static_req = (req, res, next) => {
    res.status(200).json({ message: "DesktopDigs API" });
}
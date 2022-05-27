import jwt from 'jsonwebtoken'

export default function (roles) {
    return function (req, res, next) {
        try {
            const header = req.headers.authorization
            if (!header) {
                return res.status(403).json({ message: 'пользователь не авторизован' })
            }

            const token = req.headers.authorization.split(" ")[1]
            if (!token) {
                return res.status(403).json({ message: 'пользователь не авторизован' })
            }

            const decodedData = jwt.verify(token, process.env.SECRET)

            let hasRole = false
            const userRoles = decodedData.roles
            userRoles.forEach(role => {
                if (roles.includes(role)) hasRole = true
            });
            if (!hasRole) return res.status(403).json({ message: 'нет доступа' })

            req.user = decodedData

            next()

        } catch (error) {
            console.log(error)
            return res.status(403).json({ message: 'пользователь не авторизован' })

        }
    }
}
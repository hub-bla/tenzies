import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function Conf(){
    const { width, height } = useWindowSize()
    return (
        <Confetti
          width={width}
          height={height-1}
          recycle={false}
        />
    )
}

export default Conf
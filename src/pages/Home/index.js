
// export default Home
// we get dom use react(useRef)
// the node we get dom in (useEffect)
import './index.scss'
import Bar from '@/components/Bar'
function Home () {

  return (
    <div >
      <Bar
        title="Mmainframeworks Satisfaction 1"
        xData={['react', 'vue', 'angular']}
        yData={[90, 60, 50]}
        style={{ width: '500px', height: '400px' }}
      />
      <Bar
        title="Main frameworks Satisfaction 2"
        xData={['react', 'vue', 'angular']}
        yData={[60, 70, 90]}
        style={{ width: '300px', height: '220px' }}
      />
    </div>
  )
}
export default Home


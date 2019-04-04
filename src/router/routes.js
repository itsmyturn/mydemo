import test1 from '../pages/test1'
import test2 from '../pages/test2'
import test3 from '../pages/test3'
import test1A from '../pages/test1.1'
import test1B from '../pages/test1.2'

const routes=[
    {
        path:'/test1',
        component:test1,
        redirect:'/test1/test1-1',
        children:[
            {
                path:'test1-1',
                component:test1A
            },{
                path:'test1-2',
                component:test1B
            }
        ]
    },
    {
        path:'/test2',
        component:test2
    },
    {
        path:'/test3',
        component:test3
    },
]

export default routes
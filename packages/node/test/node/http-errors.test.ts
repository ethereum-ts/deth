import { request, expect } from 'chai'
import { getApp } from '../../src/node/node'
import { TestChain, TestProvider } from '../../src'
import { NodeCtx } from '../../src/node/ctx'

describe('HTTP/errors', () => {
  let app: Express.Application
  let ctx: NodeCtx
  beforeEach(() => {
    const chain = new TestChain()
    ctx = {
      chain,
      provider: new TestProvider(chain),
    }

    app = getApp(ctx)
  })

  it('throws error when calling non existing endpoints', async () => {
    const res = await request(app)
      .get('/not-existing')
      .send({})

    expect(res).to.have.status(404)
    expect(res.body).to.be.deep.eq({
      error: {
        status: 404,
        message: 'NotFound',
      },
    })
  })
})

import { FastifyInstance } from 'fastify'
import { UnauthorizedError } from '../routes/_errors/unauthorized-error'
import fastifyPlugin from 'fastify-plugin'
import { prisma } from '@/lib/prisma'

export const auth = fastifyPlugin(async (app: FastifyInstance) => {
  app.addHook('preHandler', async (request) => {
    request.getCurrentUserId = async () => {
      try {
        const { sub } = await request.jwtVerify<{ sub: string }>()
        return sub
      } catch {
        throw new UnauthorizedError('Invalid auth token')
      }
    }
    request.getUserMembership = async (slug: string) => {
      const userId = await request.getCurrentUserId()
      const member = await prisma.member.findFirst({
        where: {
          userId,
          organization: {
            slug,
          },
        },
        include: {
          organization: true,
        },
      })
      if (!member) {
        throw new UnauthorizedError(`You're not a menber of this organization.`)
      }

      const { organization, ...membership } = member
      return {
        organization,
        membership,
      }
    }
  })
})

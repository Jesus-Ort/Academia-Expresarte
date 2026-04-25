export const useRequestQueue = (maxConcurrent = 3) => {
    const queue: (() => Promise<any>)[] = []
    let active = 0

    const next = async () => {
        if (active >= maxConcurrent) return
        if (!queue.length) return

        const job = queue.shift()
        if (!job) return

        active++

        try {
        await job()
        } catch (err) {
        console.error('Request queue error:', err)
        } finally {
        active--
        next()
        }
    }

    const add = (job: () => Promise<any>) => {
        queue.push(job)
        next()
    }

    return {
        add
    }
}
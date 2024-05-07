enum CatchType {
  Local,
  Session
}

class Catch {
  storage: Storage
  constructor(type: CatchType) {
    this.storage = type === CatchType.Local ? localStorage : sessionStorage
  }
  setCatch(key: string, value: any) {
    if (value) {
      this.storage.setItem(key, value)
    }
  }
  getCatch(key: string) {
    const value = this.storage.getItem(key)
    return value
  }
  removeCatch(key: string) {
    this.storage.removeItem(key)
  }
  clearCatch() {
    this.storage.clear()
  }
}

const localCatch = new Catch(CatchType.Local)
const sessionCach = new Catch(CatchType.Session)

export { localCatch, sessionCach }

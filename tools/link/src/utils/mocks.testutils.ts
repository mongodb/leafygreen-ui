import { ChildProcess } from 'child_process';

export class MockChildProcess extends ChildProcess {
  on = jest.fn().mockImplementation((event: string, cb: Function) => {
    cb();
    return new MockChildProcess();
  });
}

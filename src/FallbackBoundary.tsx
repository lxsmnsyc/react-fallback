/**
 * @license
 * MIT License
 *
 * Copyright (c) 2020 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2020
 */
import React, { Component, isValidElement } from 'react';
import FallbackContext, { FallbackBoundaryRefresh } from './FallbackContext';

export interface FallbackBoundaryProps {
  children: JSX.Element;
}

interface FallbackBoundaryState {
  fallback?: JSX.Element;
  version: number;
}

/**
 * An error boundary component which receives fallback UIs
 * thrown within the component tree and switches them in place
 * with the failing component.
 */
export default class FallbackBoundary
  extends Component<FallbackBoundaryProps, FallbackBoundaryState> {
  constructor(props: FallbackBoundaryProps) {
    super(props);

    this.state = {
      version: 0,
    };
  }

  public componentDidCatch(error: Error | JSX.Element): void {
    // Check if error is a valid element
    if (isValidElement(error)) {
      // Set fallback as the error
      this.setState({
        fallback: error,
        version: 0,
      });
    } else {
      // Otherwise, pass the fallback to the ancestor
      throw error;
    }
  }

  public refresh: FallbackBoundaryRefresh = (fallback) => {
    const { state: { version } } = this;
    this.setState({
      fallback,
      version: version + 1,
    });
  };

  public render(): JSX.Element {
    const { state: { fallback, version }, props: { children } } = this;
    return (
      <FallbackContext.Provider value={this.refresh} key={`${version}`}>
        { fallback ?? children }
      </FallbackContext.Provider>
    );
  }
}
